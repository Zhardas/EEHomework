package magnus.peterson.homework.controller;

import magnus.peterson.homework.model.User;
import magnus.peterson.homework.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.validation.Valid;

@Controller
@RequestMapping(value = "/users")
public class UserController {
    private User selectedUser;

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }


    @RequestMapping(value = "/{userID}", method = RequestMethod.GET)
    public String getUser(@PathVariable int userID, Model model) {
        selectedUser = userService.getUserById(userID);
        model.addAttribute("user", selectedUser);
        return "userForm";
    }


    @RequestMapping(value = "/{userID}", method = RequestMethod.POST)
    public String updateUser(@ModelAttribute("user") @Valid final User updatableUser, final BindingResult result, Model model) {

        if (!result.hasErrors()) userService.update(updatableUser);
        return "userForm";
    }
}
