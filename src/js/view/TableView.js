export default class TableView {
    constructor(target) {
        this.target = target;
    }

    templateLine(order, idx) {
        return `
    <div class="m_table_orders_order" data-index="${idx}">
        <span class="m_table_orders_order_field" data-order="name">
        ${order.name}
        </span>
        <span class="m_table_orders_order_field" data-order="phone">
        ${order.phone}
        </span>
        <span class="m_table_orders_order_field" data-order="description">
        ${order.description}
        </span>
        <span type="date" class="m_table_orders_order_field" data-order="date">
        ${order.getDateForView()}
        </span>
        <span class="m_table_orders_order_field" data-order="price">
        ${order.price}
        </span>
        <span class="m_table_orders_order_field" data-order="payment">
        ${order.payment}
        </span>
        <input disabled type="checkbox" class="m_table_orders_order_field" data-order="ok" ${order.ok ? 'checked="checked"' : ''}>
        
    </div>`;
    }

    updateView(orders) {
        this.target.innerHTML = orders.map((order, idx) => {
            return this.templateLine(order, idx);
        }).join('');
    }
}