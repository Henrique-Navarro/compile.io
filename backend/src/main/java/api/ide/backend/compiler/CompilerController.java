package api.ide.backend.compiler;

import api.ide.backend.dto.CodeDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CompilerController {

    @Autowired
    private CompilerHandler compiler;

    @PostMapping("/compile")

    public ResponseEntity<ProcessOutputDTO> compile(
            @RequestBody CodeDTO codeDTO
    ) {
        ProcessOutputDTO output = compiler.run(codeDTO);
        return ResponseEntity.ok(output);
    }
}