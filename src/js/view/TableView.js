export default class TableView {
    constructor(target) {
        this.target = target;
    }

    templateLine(order, idx) {
        return `
    <div class="m_table_orders_order" data-index="${idx}">
        <span class="m_table_orders_order_field" data-property="name">
        ${order.name}
        </span>
        <span class="m_table_orders_order_field" data-property="phone">
        ${order.phone}
        </span>
        <span class="m_table_orders_order_field" data-property="description">
        ${order.description}
        </span>
        <span type="date" class="m_table_orders_order_field" data-property="date">
        ${order.getDateForView()}
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
            return this.templateLine(order, idx);
        }).join('');

        return this.target.children;
    }
}