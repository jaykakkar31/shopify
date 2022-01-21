import moment from "moment";

class Orders {
	constructor(id, items, totalAmount=0, date) {
		this.id = id;
		this.totalAmount = totalAmount;
		this.items = items;
		this.date = date;
	}
    get readableDate(){
        return moment(this.date).format("LLL")
    }
}

export default Orders