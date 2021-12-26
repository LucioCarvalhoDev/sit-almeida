export default class TableView {
    constructor(target) {
        this.target = target;
    }

    templateLine(order) {
        return `
    <div class="m_table_orders_order">
        <span class="m_table_orders_order_field">
        ${order.name}
        </span>
        <span class="m_table_orders_order_field">
        ${order.phone}
        </span>
        <span class="m_table_orders_order_field">
        ${order.description}
        </span>
        <span type="date" class="m_table_orders_order_field">
        ${order.getDateForView()}
        </span>
        <span class="m_table_orders_order_field">
        ${order.price}
        </span>
        <span class="m_table_orders_order_field">
        ${order.payment}
        </span>
        <input disabled type="checkbox" class="m_table_orders_order_field" ${order.ok ? 'checked="checked"' : ''}>
        
    </div>`;
    }

    updateView(orders) {
        this.target.innerHTML = orders.map(order => {
            return this.templateLine(order);
        }).join('');
    }
}