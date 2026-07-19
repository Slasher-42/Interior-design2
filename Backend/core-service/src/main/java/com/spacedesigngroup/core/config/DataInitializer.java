package com.spacedesigngroup.core.config;

import com.spacedesigngroup.core.auth.Role;
import com.spacedesigngroup.core.auth.User;
import com.spacedesigngroup.core.auth.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private record AdminSeed(String fullName, String email, String password) {}

    private static final AdminSeed[] ADMINS = {
            new AdminSeed("Cedrick Ngabo", "cedrickngabo03@gmail.com", "TT4242@mtskr"),
            new AdminSeed("Prince Louis Sevelin", "princelouissevelin@gmail.com", "TT4242@mtskr"),
    };

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        for (AdminSeed admin : ADMINS) {
            if (userRepository.existsByEmail(admin.email())) {
                log.info("Admin account already present, skipping: {}", admin.email());
                continue;
            }

            userRepository.save(User.builder()
                    .fullName(admin.fullName())
                    .email(admin.email())
                    .passwordHash(passwordEncoder.encode(admin.password()))
                    .role(Role.ADMIN)
                    .enabled(true)
                    .build());

            log.info("Admin account created: {}", admin.email());
        }
    }
}
