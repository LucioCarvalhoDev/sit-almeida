class TableView {
    constructor(target) {
        this.target = target;
    }

    templateLine({ name, phone, description, date, price, payment, ok }) {
        const objDate = new Date(date);
        return `
    <div class="m_table_orders_order">
        <input class="m_table_orders_order_field" value="${name}">
        <input class="m_table_orders_order_field" value="${phone}">
        <input class="m_table_orders_order_field" value="${description}">
        <input type="date" class="m_table_orders_order_field" value="${objDate.getFullYear()}-${objDate.getMonth() + 1}-${String(objDate.getDay()).padStart(2, '0')}">
        <input class="m_table_orders_order_field" value="${price}">
        <input class="m_table_orders_order_field"value="${payment}">
        <input type="checkbox" class="m_table_orders_order_field" ${ok ? 'checked="checked"' : ''}>
    </div>`;
    }

    updateView(orders) {
        this.target.innerHTML = orders.map(order => {
            return this.templateLine(order);
        }).join('');
    }
}