package com.spacedesigngroup.core.service;

import com.spacedesigngroup.core.common.exception.AiAssessmentFailedException;
import com.spacedesigngroup.core.dto.ai.AiAssessRequestPayload;
import com.spacedesigngroup.core.dto.ai.AiAssessResultPayload;
import com.spacedesigngroup.core.dto.ai.AiCandidateSummaryRequestPayload;
import com.spacedesigngroup.core.dto.ai.AiCandidateSummaryResultPayload;
import com.spacedesigngroup.core.dto.ai.AiChatRequestPayload;
import com.spacedesigngroup.core.dto.ai.AiChatResultPayload;
import com.spacedesigngroup.core.dto.ai.AiCvAnalyzeRequestPayload;
import com.spacedesigngroup.core.dto.ai.AiCvAnalyzeResultPayload;
import com.spacedesigngroup.core.dto.ai.AiInterviewQuestionsRequestPayload;
import com.spacedesigngroup.core.dto.ai.AiInterviewQuestionsResultPayload;
import com.spacedesigngroup.core.dto.ai.AiInterviewScoreRequestPayload;
import com.spacedesigngroup.core.dto.ai.AiInterviewScoreResultPayload;
import com.spacedesigngroup.core.dto.ai.AiPortfolioAnalyzeRequestPayload;
import com.spacedesigngroup.core.dto.ai.AiPortfolioAnalyzeResultPayload;
import com.spacedesigngroup.core.dto.ai.AiProjectRequirementAssessmentRequestPayload;
import com.spacedesigngroup.core.dto.ai.AiProjectRequirementAssessmentResultPayload;
import com.spacedesigngroup.core.dto.ai.AiStageRequestPayload;
import com.spacedesigngroup.core.dto.ai.AiStageResultPayload;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.MediaType;
import org.springframework.http.client.MultipartBodyBuilder;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestClientResponseException;

import java.util.Map;

@Service
public class AiServiceClient {

    // Cold-start recovery: Render spins the ai-service down when idle, and its
    // gateway returns 502/503 for the first requests while the app boots (~45s).
    // Retry those with backoff so a cold start recovers silently instead of
    // surfacing an error. Backoff sums to ~37s, within the 120s read timeout.
    private static final long[] RETRY_BACKOFF_MS = {2_000, 5_000, 10_000, 20_000};

    private final RestClient restClient;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public AiServiceClient(@Value("${app.ai-service-url}") String baseUrl) {
        SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
        factory.setConnectTimeout(5_000);
        factory.setReadTimeout(120_000);

        this.restClient = RestClient.builder()
                .baseUrl(baseUrl)
                .requestFactory(factory)
                .build();
    }

    public AiAssessResultPayload assess(AiAssessRequestPayload payload) {
        try {
            AiAssessResultPayload result = executeWithRetry(() -> restClient.post()
                    .uri("/assess")
                    .body(payload)
                    .retrieve()
                    .body(AiAssessResultPayload.class));
            if (result == null) {
                throw new AiAssessmentFailedException("ai-service returned an empty response");
            }
            return result;
        } catch (RestClientException ex) {
            throw new AiAssessmentFailedException("ai-service could not produce a valid assessment", ex);
        }
    }

    public AiCvAnalyzeResultPayload analyzeCv(AiCvAnalyzeRequestPayload payload) {
        return post("/cv/analyze", payload, AiCvAnalyzeResultPayload.class, "could not analyze the CV");
    }

    public AiChatResultPayload chat(AiChatRequestPayload payload) {
        return post("/chat", payload, AiChatResultPayload.class, "could not produce a chat reply");
    }

    public AiCandidateSummaryResultPayload summarizeCandidate(AiCandidateSummaryRequestPayload payload) {
        return post("/designers/summary", payload, AiCandidateSummaryResultPayload.class, "could not summarize the candidate");
    }

    public AiInterviewQuestionsResultPayload generateInterviewQuestions(AiInterviewQuestionsRequestPayload payload) {
        return post("/interview/questions", payload, AiInterviewQuestionsResultPayload.class, "could not generate interview questions");
    }

    public AiInterviewScoreResultPayload scoreInterview(AiInterviewScoreRequestPayload payload) {
        return post("/interview/score", payload, AiInterviewScoreResultPayload.class, "could not score the interview");
    }

    public AiPortfolioAnalyzeResultPayload analyzePortfolio(AiPortfolioAnalyzeRequestPayload payload) {
        return post("/portfolio/analyze", payload, AiPortfolioAnalyzeResultPayload.class, "could not analyze the portfolio");
    }

    public AiProjectRequirementAssessmentResultPayload assessProjectRequirement(AiProjectRequirementAssessmentRequestPayload payload) {
        return post("/projects/requirement-assessment", payload, AiProjectRequirementAssessmentResultPayload.class, "could not assess the project requirement");
    }

    public AiStageResultPayload generateStagedImage(AiStageRequestPayload payload) {
        return post("/stage/generate", payload, AiStageResultPayload.class, "could not generate the staged image");
    }

    public AiStageResultPayload generateStagedImageFromUpload(byte[] imageBytes, String filename, String style) {
        MultipartBodyBuilder builder = new MultipartBodyBuilder();
        builder.part("style", style);
        builder.part("image", new ByteArrayResource(imageBytes) {
            @Override
            public String getFilename() {
                return filename != null ? filename : "room.png";
            }
        }).contentType(MediaType.IMAGE_PNG);

        try {
            AiStageResultPayload result = executeWithRetry(() -> restClient.post()
                    .uri("/stage/generate-upload")
                    .contentType(MediaType.MULTIPART_FORM_DATA)
                    .body(builder.build())
                    .retrieve()
                    .body(AiStageResultPayload.class));
            if (result == null) {
                throw new AiAssessmentFailedException("ai-service returned an empty response");
            }
            return result;
        } catch (RestClientException ex) {
            throw new AiAssessmentFailedException(detailOrFallback(ex, "ai-service could not generate the staged image"), ex);
        }
    }

    private <T> T post(String uri, Object body, Class<T> responseType, String failureMessage) {
        try {
            T result = executeWithRetry(() -> restClient.post()
                    .uri(uri)
                    .body(body)
                    .retrieve()
                    .body(responseType));
            if (result == null) {
                throw new AiAssessmentFailedException("ai-service returned an empty response");
            }
            return result;
        } catch (RestClientException ex) {
            throw new AiAssessmentFailedException(detailOrFallback(ex, "ai-service " + failureMessage), ex);
        }
    }

    /**
     * Runs an ai-service call, retrying transient gateway failures (502/503/504)
     * and connection errors with backoff. These are almost always Render cold
     * starts; a fresh boot is usually ready within a couple of attempts.
     */
    private <T> T executeWithRetry(java.util.function.Supplier<T> call) {
        RestClientException lastError = null;
        for (int attempt = 0; attempt <= RETRY_BACKOFF_MS.length; attempt++) {
            try {
                return call.get();
            } catch (RestClientException ex) {
                lastError = ex;
                if (attempt == RETRY_BACKOFF_MS.length || !isRetryable(ex)) {
                    throw ex;
                }
                try {
                    Thread.sleep(RETRY_BACKOFF_MS[attempt]);
                } catch (InterruptedException ie) {
                    Thread.currentThread().interrupt();
                    throw ex;
                }
            }
        }
        throw lastError; // unreachable: loop either returns or throws
    }

    private boolean isRetryable(RestClientException ex) {
        if (ex instanceof RestClientResponseException responseEx) {
            int status = responseEx.getStatusCode().value();
            return status == 502 || status == 503 || status == 504;
        }
        // No HTTP response at all (connection refused/reset/timeout) — typical
        // while the ai-service is still booting. Worth retrying.
        return true;
    }

    private String detailOrFallback(RestClientException ex, String fallback) {
        if (ex instanceof RestClientResponseException responseEx) {
            String body = responseEx.getResponseBodyAsString();
            if (body != null && !body.isBlank()) {
                try {
                    Map<?, ?> parsed = objectMapper.readValue(body, Map.class);
                    Object detail = parsed.get("detail");
                    if (detail != null) {
                        return fallback + ": " + detail;
                    }
                } catch (Exception ignored) {
                    // Non-JSON body (e.g. an HTML 502 gateway page). Don't leak
                    // the raw page into the error — return the clean fallback.
                }
            }
        }
        return fallback;
    }
}
