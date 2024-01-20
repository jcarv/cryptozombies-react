const ZombieFactoryContract = ({zombieList}) => {
    const renderZombies = zombieList.map(zombie => <li key={zombie.dna}>Name: {zombie.name} - Dna: {zombie.dna}</li>);
    return (
        <code>
        {`contract ZombieFactory {
            event NewZombie(uint zombieId, string name, uint dna);
            
            uint dnaDigits = 16;
            uint dnaModulus = 10 ** dnaDigits;
            
            struct Zombie {
                string name;
                uint dna;
            }
            
            Zombie[] public zombies;`}

            {/* <span className="secondary-color" ref={spanEle}>
                <strong>{name}</strong>
            </span> */}
            <br/>
            <br/>
            <ul>{renderZombies}</ul>
            <br/>

            {`function _createZombie(string memory _name, uint _dna) private {
                zombies.push(Zombie(_name, _dna));
                uint id = zombies.length - 1;
                emit NewZombie(id, _name, _dna);
            }
            
            function _generateRandomDna(string memory _str) private view returns (uint) {
                uint rand = uint(keccak256(abi.encodePacked(_str)));
                return rand % dnaModulus;
            }
            
            function createRandomZombie(string memory _name) public {
                uint randDna = _generateRandomDna(_name);
                _createZombie(_name, randDna);
            }

            function read() public view returns (Zombie[] memory) {
                return zombies;
            }
        }`
        }
        </code>
      );
}

export default ZombieFactoryContract;