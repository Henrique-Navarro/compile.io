package api.ide.backend.user;

import api.ide.backend.dto.CorrectionDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserHandler {

    @Autowired
    private UserService userService;

    public void addPoints(CorrectionDTO correctionDTO) {
        userService.addPoints(correctionDTO.getUserId(), correctionDTO.getPoints());
    }
}
