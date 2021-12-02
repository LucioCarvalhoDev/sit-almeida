class TableView {
    constructor(target) {
        this.target = target;
    }

    templateLine(order) {
        return `
    <div class="m_table_orders_order">
        <input class="m_table_orders_order_field" value="${order.name}">
        <input class="m_table_orders_order_field" value="${order.phone}">
        <input class="m_table_orders_order_field" value="${order.description}">
        <input type="date" class="m_table_orders_order_field" value="${order.getFormatedDate()}">
        <input class="m_table_orders_order_field" value="${order.price}">
        <input class="m_table_orders_order_field"value="${order.payment}">
        <input type="checkbox" class="m_table_orders_order_field" ${order.ok ? 'checked="checked"' : ''}>
    </div>`;
    }

    updateView(orders) {
        this.target.innerHTML = orders.map(order => {
            return this.templateLine(order);
        }).join('');
    }
}