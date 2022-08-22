package thub.gov.app.status.checker.model;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class App {
    String  id;
    String name;
    Status status;
    String description;
    List<Tag> tags = new ArrayList<>();
}
