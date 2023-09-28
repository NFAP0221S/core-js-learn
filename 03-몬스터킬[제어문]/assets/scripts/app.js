// 유저 공격 값
const ATTAK_VALUE = 10;
// 강한 공격 값
const STRONG_ATTAK_VALUE = 17;
// 몬스터 공격 값
const MONSTER_ATTAK_VALUE = 14;

// 선택한 max life
let chosenMaxLife = 100;
// 현재 몬스터 체력
let currentMonsterHealth = chosenMaxLife;
// 현재 플레이어 체력
let currentPlayerHealth = chosenMaxLife;


adjustHealthBars(chosenMaxLife)

function attackMonster(mode) {
    let maxDamage;
    if (mode === 'ATTACK') {
        maxDamage = ATTAK_VALUE;
    } else if (mode === 'STRONG_ATTACK') {
        maxDamage = STRONG_ATTAK_VALUE;
    }

    const damage = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= damage;
    
    const playerDamage = dealPlayerDamage(MONSTER_ATTAK_VALUE);
    currentPlayerHealth -= playerDamage;

    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        alert('승리!');
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
        alert('패배ㅠ');
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
        alert('무승부..')
    }
}

function attackHandler() {
    attackMonster('ATTACK');
}

function strongClickHandler() {
    attackMonster('STRONG_ATTACK');
}

attackBtn.addEventListener('click', attackHandler)
strongAttackBtn.addEventListener('click', strongClickHandler)