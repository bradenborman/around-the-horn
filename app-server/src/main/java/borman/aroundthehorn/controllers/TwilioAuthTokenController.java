package borman.aroundthehorn.controllers;

import borman.aroundthehorn.models.TwilioTokenRequest;
import borman.aroundthehorn.services.TwiloTokenService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class TwilioAuthTokenController {


    TwiloTokenService twiloTokenService;

    public TwilioAuthTokenController(TwiloTokenService twiloTokenService) {
        this.twiloTokenService = twiloTokenService;
    }


    @PostMapping("/get-room-access-token")
    public ResponseEntity<String> getAllActiveEmployees(@RequestBody TwilioTokenRequest twilioTokenRequest) {
        return ResponseEntity.ok(
                twiloTokenService.accessTokenForRoom(twilioTokenRequest)
        );
    }

}