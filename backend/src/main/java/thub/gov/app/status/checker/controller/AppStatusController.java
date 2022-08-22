package thub.gov.app.status.checker.controller;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import thub.gov.app.status.checker.model.App;
import thub.gov.app.status.checker.model.Tag;
import thub.gov.app.status.checker.service.AppStatusCheckerService;

import java.util.List;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class AppStatusController {

    AppStatusCheckerService service;

    @PostMapping("/tag")
    Tag createNewTag(@RequestBody Tag tag) {
        return service.createTag(tag);
    }

    @GetMapping("/tags")
    List<Tag> getTags() {
        return service.getTags();
    }

    @PostMapping("/app")
    App updateApp(@RequestBody App app) {
        return service.updateApp(app);
    }

    @GetMapping("/statuses/{tag}")
    List<App> getAppStatuses(@PathVariable("tag") String tag) {
        return service.getStatuses(tag);
    }

    @GetMapping("/apps")
    List<App> getApps() {
        return service.getApps();
    }
}
