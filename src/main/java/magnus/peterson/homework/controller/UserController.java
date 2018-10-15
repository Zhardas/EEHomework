package magnus.peterson.homework.controller;

import com.google.gson.Gson;
import magnus.peterson.homework.model.User;
import magnus.peterson.homework.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping(value = "/users")
public class UserController {
    private final Gson gson = new Gson();

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }


    @RequestMapping(value = "/{userID}", method = RequestMethod.DELETE)
    public @ResponseBody
    String removeUser(@PathVariable String userID, Model model) {
        userService.remove(Integer.parseInt(userID));
        return "";
    }

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public @ResponseBody
    String getUsers(Model model) {
        return gson.toJson(userService.getUsers());
    }

    @RequestMapping(value = "/", method = RequestMethod.POST)
    public @ResponseBody
    String updateUser(@RequestBody String json, Model model) {
        userService.update(gson.fromJson(json, User.class));
        return "";
    }
}
