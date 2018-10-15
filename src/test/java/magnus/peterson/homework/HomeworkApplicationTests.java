package magnus.peterson.homework;

import magnus.peterson.homework.model.User;
import magnus.peterson.homework.service.UserService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.time.LocalDate;

@RunWith(SpringRunner.class)
@SpringBootTest
public class HomeworkApplicationTests {

    @Autowired
    UserService userService;

    @Test
    public void isUsersArrayFilledTest() {
        assert !userService.getUsers().isEmpty();
    }

    @Test
    public void addRemoveUserTest() {
        int users = userService.getUsers().size();
        User testUser = new User(-1, "test", "test", LocalDate.now(), "test@test.test", "test");
        userService.update(testUser);
        assert userService.getUsers().size() == users + 1;

        User user = userService.getUsers().get(users);
        assert user.getFirstName().equals("test");
        assert user.getLastName().equals("test");
        assert user.getEmail().equals("test@test.test");
        assert user.getAddress().equals("test");

        userService.remove(user.getId());
        assert !userService.getUsers().contains(user);
    }
}
