package borman.aroundthehorn.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api")
public class RoomController {

    @GetMapping("/rooms")
    public ResponseEntity<List<String>> getRooms() {
        return ResponseEntity.ok(
                Arrays.asList(
                        "borman",
                        "chukar",
                        "montana"
                )
        );
    }

}