export { Unit, Enemy, FireElementalist, BallisticsMajor, MartialArtsMajor, EarthElementalist, KnighthoodMajor, WaterElementalist, EngineeringMajor, Slime };


// Define the Unit class
class Unit {
    constructor(name, image, health, attack, range, attackSpeed) {
        this.name = name;
        this.image = image;
        this.health = health;
        this.attack = attack;
        this.range = range;
        this.attackSpeed = attackSpeed;
        this.attackInterval = 1000 / attackSpeed; // Calculate attack interval in milliseconds
        this.enemyCheckInterval = null; // Interval variable
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

    checkForEnemies() {
        console.log(`${this.name} is checking for enemies within range ${this.range}...`);
        
        // Get the current cell position
        const currentCell = $(`#${this.name}`); // Assuming you have an ID for each unit's cell
    
        // Iterate over neighboring cells within the range
        for (let i = 1; i <= this.range; i++) {
            // Check the cell on the right side
            const $nextCell = currentCell.next(`td:nth-child(${i})`);
            if ($nextCell.hasClass('enemy')) {
                console.log(`${this.name} found an enemy in the cell ${i} units away.`);
                this.attack();
            }
        }
    }

    // Method to perform attack - can be overridden by subclasses
    attack() {
        console.log(`${this.name} attacks enemies within range ${this.range}.`);
    }
}

// Define FireElementalist subclass with custom attack method
class FireElementalist extends Unit {
    constructor() {
        super('Fire Elementalist', 'FireElementalistModel.png', 100, 20, 4, 0.4);
    }

    // Custom attack method for FireElementalist
    attack() {
        // Implement custom attack logic for FireElementalist
        console.log(`${this.name} casts fire spells at enemies.`);
    }
}

// Define BallisticsMajor subclass with custom attack method
class BallisticsMajor extends Unit {
    constructor() {
        super('Ballistics Major', 'BallisticsModel.png', 80, 10, 8, 0.9);
    }

    // Custom attack method for BallisticsMajor
    attack() {
        // Implement custom attack logic for BallisticsMajor
        console.log(`${this.name} fires ballistic projectiles at enemies.`);
    }
}

// Define MartialArtsMajor subclass with custom attack method
class MartialArtsMajor extends Unit {
    constructor() {
        super('Martial Arts Major', 'MartialArtsModel.png', 120, 35, 1, 0.7);
    }

    // Custom attack method for MartialArtsMajor
    attack() {
        // Implement custom attack logic for MartialArtsMajor
        console.log(`${this.name} performs martial arts techniques on enemies.`);
    }
}

// Define EarthElementalist subclass with custom attack method
class EarthElementalist extends Unit {
    constructor() {
        super('Earth Elementalist', 'EarthElementalistModel.png', 150, 20, 1, 0.2);
    }

    // Custom attack method for EarthElementalist
    attack() {
        // Implement custom attack logic for EarthElementalist
        console.log(`${this.name} manipulates earth to attack enemies.`);
    }
}

// Define KnighthoodMajor subclass with custom attack method
class KnighthoodMajor extends Unit {
    constructor() {
        super('Knighthood Major', 'KnighthoodModel.png', 200, 15, 1, 0.5);
    }

    // Custom attack method for KnighthoodMajor
    attack() {
        // Implement custom attack logic for KnighthoodMajor
        console.log(`${this.name} engages enemies in close combat.`);
    }
}

// Define WaterElementalist subclass with custom attack method
class WaterElementalist extends Unit {
    constructor() {
        super('Water Elementalist', 'WaterElementalistModel.png', 90, 15, 3, 0.6);
    }

    // Custom attack method for WaterElementalist
    attack() {
        // Implement custom attack logic for WaterElementalist
        console.log(`${this.name} manipulates water to attack enemies.`);
    }
}

// Define EngineeringMajor subclass with custom attack method
class EngineeringMajor extends Unit {
    constructor() {
        super('Engineering Major', 'EngineeringModel.png', 100, 20, 1, 0.4);
    }

    // Custom attack method for EngineeringMajor
    attack() {
        // Implement custom attack logic for EngineeringMajor
        console.log(`${this.name} uses advanced technology to attack enemies.`);
    }
}

// Define the Enemy class
class Enemy {
    constructor(name, image, health, attack, moveSpeed, attackSpeed) {
        this.name = name;
        this.image = image;
        this.health = health;
        this.attack = attack;
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

        // Move to the next cell
        $nextCell.append(`<div class="enemy"><img src="images/${this.image}" alt=""></div>`);
        this.currentCell.empty(); // Clear the current cell

        // Update the reference to the current cell
        this.currentCell = $nextCell;

        // Check for units in the current cell
        this.checkForUnits();
    }

    // Method to check for units in the current cell
    checkForUnits() {
        // Implement logic to check for units in the current cell
        if (this.currentCell.data('unit')) {
            // Found a unit, stop moving and attack
            this.stopMovement();
            this.attackUnit();
        }
    }

    // Method to attack a unit
    attackUnit() {
        // Implement logic to attack a unit
        console.log(`${this.name} is attacking a unit.`);
    }
}

class Slime extends Enemy {
    constructor() {
        super('Slime', 'SlimeModel.png', 100, 20, 2000, 0.4);
    }

    // Custom attack method for Slime
    attack() {
        // Implement custom attack logic for Slime
        console.log(`${this.name} slams into enemies.`);
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