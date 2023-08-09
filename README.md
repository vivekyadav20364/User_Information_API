# User_Information_API

## steps to run the project
configure `.env` file first
```
PORT=8080
MONGO_DB=your mongodb url
TOKEN=your-secret-key
```
### First run `npm install` to install all the required dependencies
### After that all API are ready to use

### Register User: `http://localhost:8080/api/user`, send the form data along with the profile picture.

![Create_User](https://github.com/vivekyadav20364/User_Information_API/assets/106297162/2b44e517-66aa-4f6d-ac57-46d9cd6bb3fc)

### Login User to generate `token` so that he/she can eligible to see all the users and `UPDATE` and `DELETE` his/her `Details
### `http://localhost:8080/api/user/login` after login take the `Bearer token for the Authentication`

![Login_User](https://github.com/vivekyadav20364/User_Information_API/assets/106297162/83313c94-0925-40a1-b8b2-a94f814f3c3f)

### See all Users Registered `http://localhost:8080/api/user` (get request) and provide `Bearer token` as well

![Get All the user](https://github.com/vivekyadav20364/User_Information_API/assets/106297162/988f7b44-1377-4372-910c-a694ea14b1d0)

### See a perticular User `http://localhost:8080/api/user/:userId` (get request) and provide `Bearer token` as well

![View one user](https://github.com/vivekyadav20364/User_Information_API/assets/106297162/ac80dcd7-b053-415e-86ab-dfa9f4476e2d)

### Update Information of the User (Note: User update only his detail by providing his token)
### `http://localhost:8080/api/user/update` (Note: Bearer token must to update that user only)

![update2](https://github.com/vivekyadav20364/User_Information_API/assets/106297162/f6b01aea-af22-4840-ad18-37e20de8f482)

## Delete User `http://localhost:8080/api/user/update` (Note: Bearer token must to delete that user only)

![Delete user](https://github.com/vivekyadav20364/User_Information_API/assets/106297162/8129cfc0-7f5b-4bfc-8289-4915ca7e7589)



