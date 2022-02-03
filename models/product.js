class Products {
	constructor(
		id,
		ownerId,
		ownerPushToken,
		title,
		imageUrl,
		description,
		price
	) {
		this.id = id;
		this.ownerId = ownerId;
		this.price = price;
        this.ownerPushToken = ownerPushToken;
		this.description = description;
		this.title = title;
		this.imageUrl = imageUrl;
	}
}
export default Products