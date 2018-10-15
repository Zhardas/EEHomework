package magnus.peterson.homework.model;

import javax.validation.constraints.Digits;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

public class User {
    @NotNull(message = "ID can't be empty!")
    @Digits(fraction = 0, integer = 8, message = "Must be a number!")
    private int id;
    @NotEmpty(message = "First name cannot be empty!")
    private String firstName;
    @NotEmpty(message = "Last name cannot be empty!")
    private String lastName;
    @NotEmpty(message = "Date of birth cannot be empty!")
    private LocalDate dateOfBirth;
    @NotEmpty(message = "Email address cannot be empty!")
    private String email;
    @NotEmpty(message = "Address cannot be empty!")
    private String address;

    public User() {

    }

    public User(int id, String firstName, String lastName, LocalDate dateOfBirth, String email, String address) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateOfBirth = dateOfBirth;
        this.email = email;
        this.address = address;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}
