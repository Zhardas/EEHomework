package magnus.peterson.homework.service;

import magnus.peterson.homework.model.User;

import java.util.ArrayList;

public interface UserService {
    User getUserById(int id);

    ArrayList<User> getUsers();

    void update(User user);

    void remove(int id);
}
