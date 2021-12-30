function randomNum(v) {
    return Math.floor(Math.random() * v);
}

function mockStorageStatic() {
    const n = randomNum(5) + 1;
    const storages = [];
    for (let i = 0; i < n; i += 1) {
        storages.push({
            Index: i,
            Model: '2.5" SATA SSD 3TG6-P',
            SN: 'A00001',
            FWVer: 'A123456',
            Par: {
                TotalCap: 233832448,
                NumofPar: 2,
                ParInfo: [{
                    MountAt: '/boot/efi',
                    Capacity: 524288,
                }, {
                    MountAt: '/',
                    Capacity: 233832448,
                }],
            },
        });
    }
    return storages;
}

function mockStorageDynamic(storageNum) {
    const storages = [];
    for (let i = 0; i < storageNum; i += 1) {
        storages.push({
            Index: i,
            SN: 'A123456',
            smart: {
                9: 15555,
                12: 34,
                167: 53,
                194: 35,
            },
            Health: randomNum(100),
            PECycle: 3000,
            Lifespan: randomNum(3000),
            iAnalyzer: {
                Enable: 2,
                SRC: 5551597,
                RRC: 63354157,
                SWC: 24494944,
                RWC: 216536595,
                SR: {
                    0: 37744,
                    1: 3453619,
                    2: 206600,
                    3: 238000,
                    4: 162505,
                    5: 210283,
                    6: 1242846,
                },
                SW: {
                    0: 1004966,
                    1: 2034035,
                    2: 630861,
                    3: 358854,
                    4: 956974,
                    5: 533432,
                    6: 18975822,
                },
                RR: {
                    0: 866599,
                    1: 23307833,
                    2: 8429518,
                    3: 5573099,
                    4: 4182483,
                    5: 3179252,
                    6: 17815373,
                },
                RW: {
                    0: 2055102,
                    1: 2913292,
                    2: 6821845,
                    3: 5007513,
                    4: 14555533,
                    5: 21662461,
                    6: 163520849,
                },
            },
        });
    }
    return storages;
}

function rawData(devName, storageNum) {
    return {
        action: {
            type: 'Recovering',
            progress: randomNum(100),
        },
        CPU: {
            0: {
                Freq: 1206,
                Usage: randomNum(100),
                Temp: 21,
                V: 9,
                status: 'off',
                frequency: 0,
                loading: 0,
            },
            1: {
                Freq: 1057,
                Usage: randomNum(100),
                Temp: 41,
                V: 8,
                status: 'off',
                frequency: 0,
                loading: 0,
            },
            2: {
                Freq: 1346,
                Usage: randomNum(100),
                Temp: 24,
                V: 8,
                status: 'off',
                frequency: 0,
                loading: 0,
            },
            3: {
                Freq: 1285,
                Usage: randomNum(100),
                Temp: 24,
                V: 10,
                status: 'off',
                frequency: 0,
                loading: 0,
            },
            Freq: randomNum(1880),
            Usage: randomNum(100),
            FanRPM: randomNum(2560),
        },
        MEM: {
            memUsed: randomNum(16777216),
            temp: randomNum(50),
        },
        GPU: {
            CoreClock: randomNum(1000),
            Temp: randomNum(50),
            MemUsed: randomNum(100),
            Load: randomNum(100),
            FanTemp: randomNum(50),
        },
        Dev: devName || 'device123456',
        Storage: mockStorageDynamic(storageNum),
    };
}

function staticData() {
    return {
        alias: '',
        CPU: {
            Manu: ' GenuineIntel',
            Name: ' Intel(R) Core(TM) i5-8400 CPU @ 2.80GHz',
            Numofcore: 4,
            L2: 1,
            L3: 9,
        },
        MB: {
            Manu: ' ASRock',
            Product: ' H370M Pro4',
            SN: ' M80-C123456',
            BIOSManu: ' American Megatrends Inc.',
            BIOSVer: ' P4.10',
            mbTemp: {},
        },
        MEM: {
            Cap: 16777216,
            Slot: {
                3: {
                    Type: ' DDR4',
                    Manu: ' 86F1',
                    Cap: 16777216,
                    SN: ' 00000001',
                    Loc: ' ChannelB-DIMM1',
                    Date: '',
                    PN: ' M4U0-AGS1KCSJ',
                    Rate: 0,
                },
            },
        },
        Net: [{
            Name: 'eno1',
            Type: 'ethernet',
            MAC: '70:85:C2:C8:54:44',
            IPv6: 'fe80::f5f2:4608:10b8:f6fc/64',
            IPaddr: '10.204.16.108/24',
            Netmask: '',
        }],
        Storage: mockStorageStatic(),
        Sys: {
            OS: 'Ubuntu 20.04.3 LTS',
            OSVer: '20.04.3 LTS (Focal Fossa)',
            OSArch: 'Linux 5.11.0-43-generic x86_64',
            Name: 'cloud-desktop',
            Longitude: 121.634977,
            Latitude: 25.059067,
        },
    };
}

module.exports = {
    randomNum,
    rawData,
    staticData,
};
