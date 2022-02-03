class CartItems {
	constructor(quantity = 0, price, title, ownerPushToken,sum = 0) {
		this.quantity = quantity;
		this.sum = sum;
		this.price = price;
		this.title = title;
        this.ownerPushToken=ownerPushToken
	}
}
export default CartItems