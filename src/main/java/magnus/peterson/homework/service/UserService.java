package magnus.peterson.homework.service;

import magnus.peterson.homework.model.User;

import java.util.ArrayList;

public interface UserService {
    public User getUserById(int id);
    public ArrayList<User> getUsers();
    public void update(User user);
    public void remove(int id);
}
