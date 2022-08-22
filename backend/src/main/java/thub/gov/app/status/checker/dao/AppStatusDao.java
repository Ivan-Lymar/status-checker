package thub.gov.app.status.checker.dao;

import org.springframework.stereotype.Component;
import thub.gov.app.status.checker.model.App;
import thub.gov.app.status.checker.model.Status;
import thub.gov.app.status.checker.model.Tag;

import java.util.*;

@Component
public class AppStatusDao {

    Map<String, Tag> tags = new HashMap<>();
    Map<String, App> apps = new HashMap<>();

    public AppStatusDao() {
        Tag all = new Tag(UUID.randomUUID().toString(), "all");
        tags.put(all.getId(), all);
        App cust = new App();
        cust.setStatus(Status.OK);
        cust.setName("thub-gov-customer");
        cust.setDescription("tricity");
        cust.setId(UUID.randomUUID().toString());
        cust.getTags().add(all);
        for (int i = 0; i < 15; i++) {
            Tag tag = new Tag(UUID.randomUUID().toString(), "random" + i);
            cust.getTags().add(tag);
            tags.put(tag.getId(), tag);
        }
        apps.put(cust.getId(), cust);
        App enrollment = new App();
        enrollment.setStatus(Status.IN_PROGRESS);
        enrollment.setName("thub-gov-enrollment");
        enrollment.setDescription("toranodes");
        enrollment.setId(UUID.randomUUID().toString());
        enrollment.getTags().add(all);
        apps.put(enrollment.getId(), enrollment);
        App broker = new App();
        broker.setStatus(Status.FAIL);
        broker.setName("thub-gov-broker");
        broker.setDescription("baltics");
        broker.setId(UUID.randomUUID().toString());
        broker.getTags().add(all);
        apps.put(broker.getId(), broker);
        App unknow = new App();
        unknow.setStatus(Status.UNKNOWN);
        unknow.setName("thub-gov-unknown");
        unknow.setDescription("unknown");
        unknow.setId(UUID.randomUUID().toString());
        unknow.getTags().add(all);
        apps.put(unknow.getId(), unknow);
    }

    public Tag createTag(Tag tag) {
        String id = UUID.randomUUID().toString();
        tag.setId(id);
        return tags.put(id, tag);
    }

    public List<Tag> getTags() {
        return new ArrayList<>(tags.values());
    }

    public Tag getTagByName(String name) {
        for (Tag tag : tags.values()) {
            if (tag.getName().equalsIgnoreCase(name)) {
                return tag;
            }
        }
        return null;
    }

    public App updateApp(App app) {
        if (app.getId() == null || app.getId().length() == 0) {
            app.setId(UUID.randomUUID().toString());
        }

        Tag all = getTagByName("all");
        app.getTags().add(all);
        app.setStatus(Status.OK);
        return apps.put(app.getId(), app);
    }

    public List<App> getStatuses(String tag) {
        List<App> resp = new ArrayList<>();
        for (App value : apps.values()) {
            for (Tag valueTag : value.getTags()) {
                if (valueTag.getName().equals(tag)) {
                    resp.add(value);
                    break;
                }
            }
        }
        return resp;
    }

    public List<App> getApps() {
        return new ArrayList<>(apps.values());
    }
}
