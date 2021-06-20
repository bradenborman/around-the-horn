package borman.aroundthehorn.controllers;

import borman.aroundthehorn.models.Room;
import borman.aroundthehorn.services.RoomService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class RoomController {

    private final RoomService roomService;

    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    @GetMapping("/rooms")
    public ResponseEntity<List<String>> getRooms() {
        List<String> roomNames = roomService.fetchAllRooms().stream().map(Room::getRoomName).collect(Collectors.toList());
        return ResponseEntity.ok(roomNames);
    }

}