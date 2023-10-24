# NextJS Assignment - Courier

## Available Scripts

To set up the project:

1. `npm install` or `bun install` to install all the dependencies.
2. Once installed, open a terminal and run `npm run dev` or `bun run dev` to run the client.
3. Open another terminal and run `npm run db` or `bun run db` to run the database.
4. All set!

## API Endpoints

### Users

1. Users - Contains all users from all roles (admin and user).

- Register User (POST): `/users`
- Get user data (GET): `/users/id`

<br />

2. Referral Codes - Contains all the referral codes. Automatically created upon the creation of a new user. Referral ID is in the user's database.

- Get referral (GET): `/referralCodes/referralId`

<br />

3. Wallet - Contains the user's balance and top up history. Automatically created upon the creation of a new user. Wallet ID is in the user's database.

- Get wallet (GET): `/userWallet/walletId`

<br />

4. Address - Contains the user's list of addresses. Automatically created upon the creation of a new user. Address ID is in the user's database.

- Get address (GET): `/userAddress/addressId`
- Delete Address (DELETE): `/userAddress/addressId`

<br />

5. Shipping - Contains the user's list of shipping. Automatically created upon the creation of a new user. Shipping ID is in the user's database.

- Get address (GET): `/userShipping/shippingId`

<br />

### Admin

Note: Every address and shipping have an adminId. The adminId in this part refers to this.

6. Vouchers - Contains a list of all the vouchers.

- Add voucher (POST): `/userVouchers`
- Get voucher (GET): `/userVouchers/voucherId`

<br />

7. Admin Earnings - Contains a list of all earnings. Automatically added upon a successful payment.

- Get earnings (GET): `/adminEarnings`

<br />

8. Admin Addresses - Contains a list of all the addresses. Automatically added upon the creation of a new address by a user.

- Get address (GET): `/adminAddress/adminId`

<br />

9. Admin Shipping - Contains a list of all the shippings. Automatically added upon the creation of a new shipping by a user.

- Get address (GET): `/adminShipping/adminId`

10. User Reviews - Contains a list of all the user reviews. Can be added for user and fetched for admin.

- Post review (POST): `/userReviews/`
- Get review (GET): `/userReviews/reviewId`
