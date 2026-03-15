package jar.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
            .csrf(csrf -> csrf.disable())
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/**").permitAll()
                .requestMatchers("/css/**", "/js/**", "/images/**", "/**/*.html", "/**/*.css", "/**/*.js").permitAll()
                .anyRequest().authenticated()
            )
            .formLogin(form -> form.permitAll())
            .logout(logout -> logout.permitAll());

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOrigin("http://localhost:5173"); // Vite dev server default
        configuration.addAllowedOrigin("http://localhost:5174"); // Vite dev server alternative
        configuration.addAllowedOrigin("http://localhost:5175"); // Additional port
        configuration.addAllowedOrigin("http://localhost:5176"); // Additional port
        configuration.addAllowedOrigin("http://localhost:5177"); // Previous frontend port
        configuration.addAllowedOrigin("http://localhost:5178"); // Current frontend port
        configuration.addAllowedOrigin("http://localhost:5179"); // Additional port
        configuration.addAllowedOrigin("http://localhost:5180"); // Additional port
        configuration.addAllowedOrigin("http://localhost:5181"); // Additional port
        configuration.addAllowedOrigin("http://localhost:5182"); // Additional port
        configuration.addAllowedOrigin("http://localhost:5183"); // Previous frontend port
        configuration.addAllowedOrigin("http://localhost:5184"); // Current frontend port
        configuration.addAllowedOrigin("http://localhost:5185"); // Current frontend port
        configuration.addAllowedOrigin("http://localhost:5186"); // Current frontend port
        configuration.addAllowedOrigin("http://localhost:5187"); // Current frontend port
        configuration.addAllowedOrigin("http://localhost:5188"); // Current frontend port
        configuration.addAllowedOrigin("http://localhost:5189"); // Additional port
        configuration.addAllowedOrigin("http://localhost:5190"); // Additional port
        configuration.addAllowedOrigin("http://localhost:5191"); // Additional port
        configuration.addAllowedOrigin("http://localhost:5192"); // Additional port
        configuration.addAllowedOrigin("http://localhost:5193"); // Additional port
        configuration.addAllowedOrigin("http://localhost:5194"); // Additional port
        configuration.addAllowedOrigin("http://localhost:5195"); // Additional port
        configuration.addAllowedMethod("*");
        configuration.addAllowedHeader("*");
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}