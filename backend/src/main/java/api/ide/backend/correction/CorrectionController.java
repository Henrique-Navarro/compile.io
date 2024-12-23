package api.ide.backend.correction;

import api.ide.backend.chatgpt.ChatRequest;
import api.ide.backend.chatgpt.ChatResponse;
import api.ide.backend.compiler.CompilerHandler;
import api.ide.backend.compiler.ProcessOutputDTO;
import api.ide.backend.dto.CodeDTO;
import api.ide.backend.dto.CorrectionDTO;
import api.ide.backend.question.service.QuestionService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/correction")
public class CorrectionController {

    @Autowired
    private CorrectionHandler correction;
    @Autowired
    private CompilerHandler compiler;
    @Autowired
    private QuestionService questionService;
    @Qualifier("openaiRestTemplate")
    @Autowired
    private RestTemplate restTemplate;

    @Value("${openai.model}")
    private String model;
    @Value("${openai.api.url}")
    private String apiUrl;

    @PostMapping("/code/run")
    private ResponseEntity<ProcessOutputDTO> run(@RequestBody @Valid CodeDTO codeDTO) {
        ProcessOutputDTO output = compiler.run(codeDTO);
        return ResponseEntity.ok(output);
    }

    @PostMapping("/code/submit")
    private ResponseEntity<CorrectionDTO> submit(@RequestBody @Valid CodeDTO codeDTO, Long userId) {
        CorrectionDTO correctionDTO = correction.submit(codeDTO);

        return ResponseEntity.ok(correctionDTO);
    }

    @GetMapping("/chat")
    public String chat(@RequestParam String prompt) {
        // create a request
        ChatRequest request = new ChatRequest(model, prompt);

        // call the API
        ChatResponse response = restTemplate.postForObject(apiUrl, request, ChatResponse.class);

        if (response == null || response.getChoices() == null || response.getChoices().isEmpty()) {
            return "No response";
        }

        // return the first response
        // Retornar o valor dentro da tag <CORRECTION_CODE>
        return response.getChoices().getFirst().getMessage().getContent();
    }
}
