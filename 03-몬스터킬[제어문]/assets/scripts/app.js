// 유저 공격 값
const ATTAK_VALUE = 10;
// 강한 공격 값
const STRONG_ATTAK_VALUE = 17;
// 몬스터 공격 값
const MONSTER_ATTAK_VALUE = 14;
// 체력 회복 값
const HEAL_VAlUE = 20;
// 초기 체력 입력 값
const enteredValue = prompt('몬스터와 유저의 최대 채력을 설정합니다.', '100')

// 선택한 max life
let chosenMaxLife = parseInt(enteredValue);

// max life가 NaN이거나 0이랑 같거나 작을경우 초기 값 100으로 설정
if (isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
    chosenMaxLife = 100;
}

// 현재 몬스터 체력
let currentMonsterHealth = chosenMaxLife;
// 현재 플레이어 체력
let currentPlayerHealth = chosenMaxLife;
// 보너스 생명
let hasBounsLife = true;

// 유저 체력 바
adjustHealthBars(chosenMaxLife);

function reset() {
    currentMonsterHealth = chosenMaxLife;
    currentPlayerHealth = chosenMaxLife;
    resetGame(chosenMaxLife);
}

// 몬스터 공격 셋업
function endRound() {
    const initialPlayerHealth = currentPlayerHealth;
    const playerDamage = dealPlayerDamage(MONSTER_ATTAK_VALUE);
    currentPlayerHealth -= playerDamage;

    if (currentPlayerHealth <= 0 && hasBounsLife) {
        hasBounsLife = false;
        removeBonusLife();
        currentPlayerHealth = initialPlayerHealth;
        setPlayerHealth(initialPlayerHealth);
        alert('당신은 보너스 생명이 있습니다!');
    }

    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        alert('승리!');
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
        alert('패배ㅠ');
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
        alert('무승부..');
    }

    if (currentPlayerHealth <= 0 || currentMonsterHealth <= 0) {
        reset();
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
        alert('체력을 회복할 수 없습니다.');
        healValue = chosenMaxLife - currentPlayerHealth;
    } else {
        healValue = HEAL_VAlUE;
    }
    increasePlayerHealth(healValue);
    currentPlayerHealth += healValue;

    // 회복 후 몬스터가 공격
    endRound();
}


attackBtn.addEventListener('click', attackHandler); // 기본 공격 실행
strongAttackBtn.addEventListener('click', strongClickHandler); // 강한 공격 실행
healBtn.addEventListener('click', healPlayerHandler); // 힐 실행