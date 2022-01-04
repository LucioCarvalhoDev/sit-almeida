export default class TableView {
    constructor(target) {
        this.target = target;
    }

    _templateLine(order, idx) {
        return `
    <div class="m_table_orders_order" data-id="${order.id}">
        <span class="m_table_orders_order_field" data-property="name">
        ${order.name}
        </span>
        <span class="m_table_orders_order_field" data-property="phone">
        ${this._phoneFormatter(order.phone)}
        </span>
        <span class="m_table_orders_order_field" data-property="description">
        ${order.description}
        </span>
        <span type="date" class="m_table_orders_order_field" data-property="date">
        ${order.dateForView()}
        </span>
        <span class="m_table_orders_order_field" data-property="price">
        ${order.price}
        </span>
        <span class="m_table_orders_order_field" data-property="payment">
        ${order.payment}
        </span>
        <input disabled type="checkbox" class="m_table_orders_order_field" data-property="ok" ${order.ok ? 'checked="checked"' : ''}>
        
    </div>`;
    }

    updateView(orders) {
        this.target.innerHTML = orders.map((order, idx) => {
            return this._templateLine(order, idx);
        }).join('');

        return this.target.children;
    }

    _phoneFormatter(rawString) {
        const cleanPhone = rawString.replaceAll(/[^0-9]/g, '').substr(-12);
        const len = cleanPhone.length;

        let ddd = '71';
        let phone;

        switch (len) {
            case 8:
                phone = `${ddd} 9 ${cleanPhone.substr(0, 4)}-${cleanPhone.substr(4, 4)}`;
                break;
            case 9:
                phone = `${ddd} 9 ${cleanPhone.substr(1, 4)}-${cleanPhone.substr(5, 4)}`;
                break;
            case 10:
                ddd = cleanPhone.substr(0, 2);
                phone = `${ddd} 9 ${cleanPhone.substr(2, 4)}-${cleanPhone.substr(6, 4)}`;
                break;
            case 11:
                ddd = cleanPhone.substr(0, 2);
                phone = `${ddd} 9 ${cleanPhone.substr(3, 4)}-${cleanPhone.substr(7, 4)}`;
                break;
            default:
                phone = cleanPhone;
        }

        return phone;
    }
}