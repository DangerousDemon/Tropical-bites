document.addEventListener('DOMContentLoaded', () => {
    filterMenu('all');
    populateFoodChoices();
    document.querySelectorAll('input[name="food"], input[name="servings"]').forEach(input => {
        input.addEventListener('change', updateTotalCost);
    });
    document.getElementById('order-form').addEventListener('submit', handleSubmit);

    // Add event listener for category filter
    document.getElementById('category-filter').addEventListener('change', (event) => {
        filterMenu(event.target.value);
    });
});

const menuItems = [
    { name: 'Mas Huni Tacos', category: 'appetizers', price: 120, image: 'images/mas_huni_tacos.jpg', description: 'Tacos filled with a traditional Maldivian tuna salad.' },
    { name: 'Spicy Fish Balls', category: 'appetizers', price: 90, image: 'images/spicy_fish_balls.jpg', description: 'Deep-fried fish balls with a spicy kick.' },
    { name: 'Coconut Shrimp', category: 'appetizers', price: 150, image: 'images/coconut_shrimp.jpg', description: 'Shrimp coated in coconut flakes and fried to perfection.' },
    { name: 'Maldivian Chicken Wings', category: 'main-courses', price: 180, image: 'images/maldivian_chicken_wings.jpg', description: 'Chicken wings marinated in Maldivian spices.' },
    { name: 'Fried Reef Fish Sandwich', category: 'main-courses', price: 135, image: 'images/fried_reef_fish_sandwich.jpg', description: 'Sandwich with fried reef fish and fresh vegetables.' },
    { name: 'Breadfruit Chips with Tuna Dip', category: 'main-courses', price: 105, image: 'images/breadfruit_chips.jpg', description: 'Crispy breadfruit chips served with a creamy tuna dip.' },
    { name: 'Banana Fritters', category: 'desserts', price: 75, image: 'images/banana_fritters.jpg', description: 'Fried banana fritters drizzled with honey.' },
    { name: 'Coconut Pancakes', category: 'desserts', price: 90, image: 'images/coconut_pancakes.jpg', description: 'Pancakes made with coconut milk and topped with coconut flakes.' },
    { name: 'Saagu Bondibai', category: 'desserts', price: 60, image: 'images/saagu_bondibai.jpg', description: 'Traditional Maldivian dessert made with sago and coconut milk.' },
    { name: 'Coconut Milkshakes', category: 'drinks', price: 75, image: 'images/coconut_milkshakes.jpg', description: 'Refreshing milkshake made with fresh coconut milk.' },
    { name: 'Raa Mojito', category: 'drinks', price: 105, image: 'images/raa_mojito.jpg', description: 'A tropical twist on the classic mojito, made with Maldivian raa.' },
    { name: 'Tropical Fruit Smoothies', category: 'drinks', price: 90, image: 'images/tropical_fruit_smoothies.jpg', description: 'Smoothies made with a blend of tropical fruits.' }
];

function filterMenu(category) {
    const menuContainer = document.getElementById('menu-items');
    menuContainer.innerHTML = '';
    const filteredItems = category === 'all' ? menuItems : menuItems.filter(item => item.category === category);

    let row;
    filteredItems.forEach((item, index) => {
        if (index % 3 === 0) {
            row = document.createElement('div');
            row.classList.add('menu-row');
            menuContainer.appendChild(row);
        }
        const menuItem = document.createElement('div');
        menuItem.classList.add('menu-item');
        menuItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="menu-item-details">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <p>Price: MVR ${item.price}</p>
            </div>
        `;
        row.appendChild(menuItem);
    });
}

function populateFoodChoices() {
    const foodChoicesTable = document.querySelector('#food-choices tbody');
    foodChoicesTable.innerHTML = '';
    const categories = [...new Set(menuItems.map(item => item.category))];
    categories.forEach(category => {
        const categoryRow = document.createElement('tr');
        const categoryCell = document.createElement('td');
        categoryCell.colSpan = 4;
        categoryCell.classList.add('category-header');
        categoryCell.textContent = category.charAt(0).toUpperCase() + category.slice(1);
        categoryRow.appendChild(categoryCell);
        foodChoicesTable.appendChild(categoryRow);
        menuItems.filter(item => item.category === category).forEach(item => {
            const itemRow = document.createElement('tr');
            itemRow.innerHTML = `
                <td><input type="checkbox" name="food" value="${item.name}" data-price="${item.price}"></td>
                <td>${item.name}</td>
                <td>${item.price}</td>
                <td><input type="number" name="servings" min="1" value="" data-price="${item.price}"></td>
            `;
            foodChoicesTable.appendChild(itemRow);
        });
    });
}

function updateTotalCost() {
    let totalCost = 0;
    document.querySelectorAll('input[name="food"]:checked').forEach(checkbox => {
        const price = parseFloat(checkbox.dataset.price);
        const servingsInput = checkbox.closest('tr').querySelector('input[name="servings"]');
        const servings = parseInt(servingsInput.value) || 0;
        totalCost += price * servings;
    });
    document.getElementById('total-cost').textContent = totalCost;
}

function handleSubmit(event) {
    event.preventDefault();
    if (validateForm()) {
        alert('Your order has been completed!');
    } else {
        alert('Please fill in all required fields correctly.');
    }
}

function validateForm() {
    let valid = true;
    document.querySelectorAll('input[name="food"]:checked').forEach(checkbox => {
        const servingsInput = checkbox.closest('tr').querySelector('input[name="servings"]');
        if (!servingsInput.value || parseInt(servingsInput.value) <= 0) {
            valid = false;
            servingsInput.style.border = '2px solid red';
        } else {
            servingsInput.style.border = '';
        }
    });
    return valid;
}
