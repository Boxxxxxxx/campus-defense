export { Unit, Enemy, FireElementalist, BallisticsMajor, MartialArtsMajor, EarthElementalist, KnighthoodMajor, WaterElementalist, EngineeringMajor, Slime };

// Define the Unit class
class Unit {
    constructor(name, image, health, attackDamage, range, attackSpeed) {
        this.name = name;
        this.image = image;
        this.health = health;
        this.attackDamage = attackDamage;
        this.range = range;
        this.attackSpeed = attackSpeed;
        this.attackInterval = 1000 / attackSpeed;
        this.enemyCheckInterval = null;
        this.currentCell = null;
    }

    // Set the current cell of the unit
    setCurrentCell(cell) {
        this.currentCell = cell;
    }
    
    // Start checking for enemies at the specified interval
    startEnemyCheck() {
        // Call checkForEnemies immediately
        this.checkForEnemies();
        // Set interval to call checkForEnemies
        this.enemyCheckInterval = setInterval(() => {
            this.checkForEnemies();
        }, this.attackInterval);
    }

    // Stop checking for enemies
    stopEnemyCheck() {
        clearInterval(this.enemyCheckInterval);
    }

    // Method to perform attack - can be overridden by subclasses
    attack() {
        console.log(`${this.name} attacks enemies within range ${this.range}.`);
    }
    
    checkForEnemies() {
        // Iterate over neighboring cells within the range
        for (let i = 0; i <= this.range; i++) {
            // Calculate the column index of the neighboring cell
            const columnIndex = this.currentCell.index() + i;
    
            // Get the neighboring cell in the same row
            const $neighborCell = this.currentCell.closest('tr').find(`td:eq(${columnIndex})`);
    
            // Check if the neighboring cell contains an enemy
            if ($neighborCell.length && $neighborCell.children('.enemy').length > 0) {
                const enemyList = $neighborCell.data('enemies');
                const enemy = enemyList.peek();
                if (enemy instanceof Enemy) {
                    this.attack(enemy);
                }
            }
        }
    }

    loseHealth(health) {
        this.health -= health;
        if (this.health <= 0) {
            this.die();
        }
    }

    die() {
        console.log(`${this.name} has died`);
        // Remove only the unit's image from the current cell
        this.currentCell.find(`img[src="images/${this.image}"]`).remove();
        // Optionally, you can also remove the unit's reference from the cell's data
        this.currentCell.removeData('unit');
        this.stopEnemyCheck(); // Stop enemy check interval if it's still running
    }
}

// Define FireElementalist subclass with custom attack method
class FireElementalist extends Unit {
    constructor() {
        super('Fire Elementalist', 'FireElementalistModel.png', 100, 20, 4, 0.4);
    }

    // Custom attack method for FireElementalist
    attack(enemy) {
        enemy.loseHealth(this.attackDamage);
    }
}

// Define BallisticsMajor subclass with custom attack method
class BallisticsMajor extends Unit {
    constructor() {
        super('Ballistics Major', 'BallisticsModel.png', 80, 10, 8, 0.9);
    }

    // Custom attack method for BallisticsMajor
    attack(enemy) {
        enemy.loseHealth(this.attackDamage);
    }
}

// Define MartialArtsMajor subclass with custom attack method
class MartialArtsMajor extends Unit {
    constructor() {
        super('Martial Arts Major', 'MartialArtsModel.png', 120, 35, 1, 0.7);
    }

    // Custom attack method for MartialArtsMajor
    attack(enemy) {
        enemy.loseHealth(this.attackDamage);
    }
}

// Define EarthElementalist subclass with custom attack method
class EarthElementalist extends Unit {
    constructor() {
        super('Earth Elementalist', 'EarthElementalistModel.png', 150, 20, 1, 0.2);
    }

    // Custom attack method for EarthElementalist
    attack(enemy) {
        enemy.loseHealth(this.attackDamage);
    }
}

// Define KnighthoodMajor subclass with custom attack method
class KnighthoodMajor extends Unit {
    constructor() {
        super('Knighthood Major', 'KnighthoodModel.png', 200, 15, 1, 0.5);
    }

    // Custom attack method for KnighthoodMajor
    attack(enemy) {
        enemy.loseHealth(this.attackDamage);
    }
}

// Define WaterElementalist subclass with custom attack method
class WaterElementalist extends Unit {
    constructor() {
        super('Water Elementalist', 'WaterElementalistModel.png', 90, 15, 3, 0.6);
    }

    // Custom attack method for WaterElementalist
    attack(enemy) {
        enemy.loseHealth(this.attackDamage);
    }
}

// Define EngineeringMajor subclass with custom attack method
class EngineeringMajor extends Unit {
    constructor() {
        super('Engineering Major', 'EngineeringModel.png', 100, 20, 1, 0.4);
    }

    // Custom attack method for EngineeringMajor
    attack(enemy) {
        enemy.loseHealth(this.attackDamage);
    }
}

// Define the Enemy class
class Enemy {
    constructor(name, image, health, attackDamage, moveSpeed, attackSpeed) {
        this.name = name;
        this.image = image;
        this.health = health;
        this.attackDamage = attackDamage;
        this.moveSpeed = moveSpeed;
        this.attackSpeed = attackSpeed;
        this.attackInterval = 1000 / attackSpeed;
        this.currentCell = null; // Reference to the current cell
        this.moveInterval = null; // Interval variable for movement
        this.attacking = false; // Flag to indicate if enemy is attacking
    }

    // Method to start enemy movement
    startMovement() {
        this.moveInterval = setInterval(() => {
            this.moveLeft(); // Move left
        }, this.moveSpeed);
    }

    // Method to stop enemy movement
    stopMovement() {
        clearInterval(this.moveInterval);
    }

    // Method to handle enemy movement to the left
    moveLeft() {
        // Get the next cell to the left
        const $nextCell = this.currentCell.prev('td');
        if ($nextCell.length === 0) {
            // Reached the end of the row, stop movement
            this.stopMovement();
            return;
        }

        // Remove the enemy from the current cell's EnemyList
        const enemyList = this.currentCell.data('enemies');
        if (enemyList) {
            enemyList.dequeue();
        }

        // Move to the next cell
        $nextCell.append(`<div class="enemy"><img src="images/${this.image}" alt=""></div>`);
        this.currentCell.empty(); // Clear the current cell

        // Update the reference to the current cell
        this.currentCell = $nextCell;

        // Add the enemy to the next cell's EnemyList
        const nextEnemyList = $nextCell.data('enemies');
        if (nextEnemyList) {
            nextEnemyList.enqueue(this);
        }

        // Check for units in the current cell
        this.checkForUnits();
    }

    // Method to check for units in the current cell
    checkForUnits() {
        // Implement logic to check for units in the current cell
        if (this.currentCell.data('unit')) {
            // Found a unit, stop moving and attack
            this.stopMovement();
            this.attack(this.currentCell.data('unit'));
        }

        // Remove the enemy from the current cell's EnemyList if it leaves
        const enemyList = this.currentCell.data('enemies');
        if (enemyList && enemyList.peek() !== this) {
            enemyList.dequeue();
        }
    }

    // Method to attack a unit
    attack(unit) {
        // Implement logic to attack a unit
        console.log(`${this.name} is attacking a unit.`);
    }

    loseHealth(health) {
        this.health -= health;
        if (this.health <= 0) {
            this.die();
        }
    }

    die() {
        // Remove the enemy's image from the current cell
        this.currentCell.find(`img[src="images/${this.image}"]`).remove();
        // Remove the enemy from the current cell's EnemyList
        const enemyList = this.currentCell.data('enemies');
        if (enemyList) {
            enemyList.dequeue();
        }
        this.stopMovement(); // Stop enemy movement
    }
}

class Slime extends Enemy {
    constructor() {
        super('Slime', 'SlimeModel.png', 100, 20, 2000, 0.4);
        this.attackIntervalId = null; // Add a property to hold the attack interval ID
    }

    attack(unit) {
        const attackAction = () => {
            unit.loseHealth(this.attackDamage);
        };

        attackAction();

        this.attackIntervalId = setInterval(() => {
            attackAction();
            // Check if the unit being attacked is still alive
            if (!this.currentCell.data('unit')) {
                clearInterval(this.attackIntervalId);
                this.startMovement(); // Resume movement if the unit is dead
            }
        }, this.attackInterval);
    }

    die() {
        // Stop attacking if the slime dies
        clearInterval(this.attackIntervalId);
        super.die(); // Call the parent class's die method to perform common death actions
    }
}


/* TODO
class DireWolf extends Enemy {
    constructor() {
        super('Slime', 'images/SlimeModel.png', 100, 20, 2000, 0.4);
    }

    // Custom attack method for Slime
    attack() {
        // Implement custom attack logic for Slime
        console.log(`${this.name} slams into enemies.`);
    }
}

class Orc extends Enemy {
    constructor() {
        super('Slime', 'images/SlimeModel.png', 100, 20, 2000, 0.4);
    }

    // Custom attack method for Slime
    attack() {
        // Implement custom attack logic for Slime
        console.log(`${this.name} slams into enemies.`);
    }
}
*/