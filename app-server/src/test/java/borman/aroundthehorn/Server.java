package borman.aroundthehorn;

import org.springframework.boot.builder.SpringApplicationBuilder;

public class Server extends AroundTheHornApplication {

    public static void main(String[] args) {
        new Server().configure(new SpringApplicationBuilder())
                .initializers()
                .profiles("local")
                .run(args);
    }

}