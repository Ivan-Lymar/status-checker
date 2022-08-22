package thub.gov.app.status.checker.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import thub.gov.app.status.checker.dao.AppStatusDao;
import thub.gov.app.status.checker.model.App;
import thub.gov.app.status.checker.model.Tag;

import java.util.List;

@Service
@AllArgsConstructor
public class AppStatusCheckerService {

    AppStatusDao appStatusDao;

    public Tag createTag(Tag tag) {
        return appStatusDao.createTag(tag);
    }

    public List<Tag> getTags() {
        return appStatusDao.getTags();

    }

    public App updateApp(App app) {
        return appStatusDao.updateApp(app);
    }

    public List<App> getStatuses(String tag) {
        return appStatusDao.getStatuses(tag);
    }

    public List<App> getApps() {
        return appStatusDao.getApps();
    }
}
