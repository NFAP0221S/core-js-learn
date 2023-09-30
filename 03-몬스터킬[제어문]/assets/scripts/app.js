// 유저 공격 값
const ATTACK_VALUE = 10;
// 강한 공격 값
const STRONG_ATTACK_VALUE = 17;
// 몬스터 공격 값
const MONSTER_ATTACK_VALUE = 14;
// 체력 회복 값
const HEAL_VAlUE = 20;

const MODE_ATTACK = 'ATTACK'; // MODE_ATTACK = 0
const MODE_STORNG_ATTACK = 'STRONG_ATTACK'; // MODE_STORNG_ATTACK = 1
const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_EVENT_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_EVENT_GAME_OVER = 'GAME_OVER';

// 초기 체력 입력 값
const enteredValue = prompt('몬스터와 유저의 최대 채력을 설정합니다.', '100')

// 선택한 max life
let chosenMaxLife = parseInt(enteredValue);
// 배틀 로그
let battleLog = [];

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

function writeToLog(e, val, monsterHealth, playerHealth) {
    let logEntry = {
        event: e,
        value: val,
        finalMonsterHealth: monsterHealth,
        finalPlayerHealth: playerHealth
    };
    if (e === LOG_EVENT_PLAYER_ATTACK) {
        logEntry.target = 'MONSTER';
    } else if (e === LOG_EVENT_PLAYER_STRONG_ATTACK) {
        logEntry = {
            event: e,
            value: val,
            target: 'MONSTER',
            finalMonsterHealth: monsterHealth,
            finalPlayerHealth: playerHealth
        };
    } else if (e === LOG_EVENT_MONSTER_ATTACK) {
        logEntry = {
            event: e,
            value: val,
            target: 'PLAYER',
            finalMonsterHealth: monsterHealth,
            finalPlayerHealth: playerHealth
        };
    } else if (e === LOG_EVENT_PLAYER_HEAL) {
        logEntry = {
            event: e,
            value: val,
            target: 'PLAYER',
            finalMonsterHealth: monsterHealth,
            finalPlayerHealth: playerHealth
        };
    } else if (e === LOG_EVENT_GAME_OVER) {
        logEntry = {
            event: e,
            value: val,
            finalMonsterHealth: monsterHealth,
            finalPlayerHealth: playerHealth
        };
    }
    battleLog.push(logEntry);
}

// 게임 리셋
function reset() {
    currentMonsterHealth = chosenMaxLife;
    currentPlayerHealth = chosenMaxLife;
    resetGame(chosenMaxLife);
}

// 몬스터 공격 셋업
function endRound() {
    const initialPlayerHealth = currentPlayerHealth;
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage;
    writeToLog(
        LOG_EVENT_MONSTER_ATTACK,
        playerDamage,
        currentMonsterHealth,
        currentPlayerHealth
    );

    if (currentPlayerHealth <= 0 && hasBounsLife) {
        hasBounsLife = false;
        removeBonusLife();
        currentPlayerHealth = initialPlayerHealth;
        setPlayerHealth(initialPlayerHealth);
        alert('당신은 보너스 생명이 있습니다!');
    }

    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        alert('승리!');
        writeToLog(
            LOG_EVENT_MONSTER_ATTACK,
            'PLAYER WON',
            currentMonsterHealth,
            currentPlayerHealth
        );
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
        alert('패배ㅠ');
        writeToLog(
            LOG_EVENT_MONSTER_ATTACK,
            'MONSTER WON',
            currentMonsterHealth,
            currentPlayerHealth
        );
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
        alert('무승부..');
        writeToLog(
            LOG_EVENT_GAME_OVER,
            'A DRAW',
            currentMonsterHealth,
            currentPlayerHealth
        );
    }

    if (currentPlayerHealth <= 0 || currentMonsterHealth <= 0) {
        reset();
    }
}

// 기본 공격 셋업
function attackMonster(mode) {
    let maxDamage;
    let logEvent;
    if (mode === MODE_ATTACK) {
        maxDamage = ATTACK_VALUE;
        logEvent = LOG_EVENT_PLAYER_ATTACK
    } else if (mode === MODE_STORNG_ATTACK) {
        maxDamage = STRONG_ATTACK_VALUE;
        logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK
    }

    const damage = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= damage;
    writeToLog(
        logEvent,
        damage,
        currentMonsterHealth,
        currentPlayerHealth
    );

    // 공격 후 몬스터가 공격
    endRound();
}

// 기본 공격
function attackHandler() {
    attackMonster(MODE_ATTACK);
}
// 강한 공격
function strongAttackHandler() {
    attackMonster(MODE_STORNG_ATTACK);
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
    writeToLog(
        LOG_EVENT_PLAYER_HEAL,
        healValue,
        currentMonsterHealth,
        currentPlayerHealth
    );

    // 회복 후 몬스터가 공격
    endRound();
}

// 로그 출력
function printLogHandler() {
    console.log(battleLog);
};

attackBtn.addEventListener('click', attackHandler); // 기본 공격 실행
strongAttackBtn.addEventListener('click', strongAttackHandler); // 강한 공격 실행
healBtn.addEventListener('click', healPlayerHandler); // 힐 실행
logBtn.addEventListener('click', printLogHandler); // 로그 출력 실행