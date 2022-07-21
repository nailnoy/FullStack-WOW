package workoutwith;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;


@EnableJpaAuditing
@SpringBootApplication
public class BackApplication {

    public static final String APPLICATION_LOCATIONS = "spring.config.location="
            + "classpath:application.yml"
            + ",classpath:s3key.yml";

    public static void main(String[] args) {
        new SpringApplicationBuilder(BackApplication.class)
                .properties(APPLICATION_LOCATIONS)
                .run(args);
    }

}