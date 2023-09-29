// 유저 공격 값
const ATTAK_VALUE = 10;
// 강한 공격 값
const STRONG_ATTAK_VALUE = 17;
// 몬스터 공격 값
const MONSTER_ATTAK_VALUE = 14;
// 체력 회복 값
const HEAL_VAlUE = 20;

// 선택한 max life
let chosenMaxLife = 100;
// 현재 몬스터 체력
let currentMonsterHealth = chosenMaxLife;
// 현재 플레이어 체력
let currentPlayerHealth = chosenMaxLife;

// 유저 체력 바
adjustHealthBars(chosenMaxLife)


// 몬스터 공격 셋업
function endRound() {
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

// 기본 공격 셋업
function attackMonster(mode) {
    let maxDamage;
    if (mode === 'ATTACK') {
        maxDamage = ATTAK_VALUE;
    } else if (mode === 'STRONG_ATTACK') {
        maxDamage = STRONG_ATTAK_VALUE;
    }

    const damage = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= damage;

    // 공격 후 몬스터가 공격
    endRound();
}

// 기본 공격
function attackHandler() {
    attackMonster('ATTACK');
}
// 강한 공격
function strongClickHandler() {
    attackMonster('STRONG_ATTACK');
}
// 회복
function healPlayerHandler() {
    let healValue;

    // 현재 체력이 (MaxLife - 힐) 보다 같거나 크면
    if (currentPlayerHealth >= chosenMaxLife - HEAL_VAlUE) {
        alert('체력을 회복할 수 없습니다.')
        healValue = chosenMaxLife - currentPlayerHealth;
    } else {
        healValue = HEAL_VAlUE;
    }
    increasePlayerHealth(healValue);
    currentPlayerHealth += healValue;

    // 회복 후 몬스터가 공격
    endRound();
}


attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongClickHandler);
healBtn.addEventListener('click', healPlayerHandler);