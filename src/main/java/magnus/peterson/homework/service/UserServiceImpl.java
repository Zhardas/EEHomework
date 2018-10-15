package magnus.peterson.homework.service;

import magnus.peterson.homework.model.User;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;

@Service("userService")
public class UserServiceImpl implements UserService {
    // Initialize users array with sample users.
    private ArrayList<User> users = new ArrayList<>(
            Arrays.asList(
                    new User(0, "Ain", "Kala", LocalDate.of(1900, 11, 1), "ain.kala@gmail.com", "Viiralti 13 Tallinn"),
                    new User(1, "Siiru", "Viiru", LocalDate.of(1980, 11, 1), "siiru.viiru@gmail.com", "Soo 10 Tallinn"),
                    new User(2, "Heli", "Kopter", LocalDate.of(1907, 8, 14), "heli.kopter@gmail.com", "Prantsusmaa")
            )
    );
    private int idCounter = 2;

    @Override
    public User getUserById(int id) {
        for (User user : users) {
            if (user.getId() == id) return user;
        }
        return null;
    }

    @Override
    public ArrayList<User> getUsers() {
        return users;
    }

    @Override
    public void update(User user) {
        User updatableUser = getUserById(user.getId());
        if (updatableUser == null) {
            user.setId(++idCounter);
            users.add(user);
            return;
        }
        updatableUser.setFirstName(user.getFirstName());
        updatableUser.setLastName(user.getLastName());
        updatableUser.setDateOfBirth(user.getDateOfBirth());
        updatableUser.setEmail(user.getEmail());
        updatableUser.setAddress(user.getAddress());
    }

    @Override
    public void remove(int id) {
        users.removeIf(user -> user.getId() == id);
    }
}
