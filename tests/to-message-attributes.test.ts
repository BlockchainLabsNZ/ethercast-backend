import toLogMessageAttributes from '../src/util/to-log-message-attributes';
import { LogFilterType } from '../src/util/models';
import { Log } from '@ethercast/model';
import { expect } from 'chai';

function fakeLog(address: string, ...topics: string[]): Log {
  return {
    address,
    topics
  } as Log;
}

describe('#toLogMessageAttributes', () => {

  it('extracts attributes from logs', () => {
    expect(
      toLogMessageAttributes(fakeLog('abc', '123'))
    ).to.deep.eq({
      [LogFilterType.address]: {
        DataType: 'String',
        StringValue: 'abc'
      },
      [LogFilterType.topic0]: {
        DataType: 'String',
        StringValue: '123'
      }
    });
  });

  it('downcases all attributes', () => {
    expect(
      toLogMessageAttributes(fakeLog('0x06012c8cf97BEaD5deAe237070F9587f8E7A266d'))
    ).to.deep.eq({
      [LogFilterType.address]: {
        DataType: 'String',
        StringValue: '0x06012c8cf97bead5deae237070f9587f8e7a266d'
      }
    });

    expect(
      toLogMessageAttributes(fakeLog('0x06012c8cf97BEaD5deAe237070F9587f8E7A266d', '0x000000000000000000000000Fa6236e28e9aF20424d2a16daccd481b63375473'))
    ).to.deep.eq({
      [LogFilterType.address]: {
        DataType: 'String',
        StringValue: '0x06012c8cf97bead5deae237070f9587f8e7a266d'
      },
      [LogFilterType.topic0]: {
        DataType: 'String',
        StringValue: '0x000000000000000000000000fa6236e28e9af20424d2a16daccd481b63375473'
      }
    });
  });

  it('produces expected result on example log', () => {
    expect(
      toLogMessageAttributes(fakeLog(
        '0xd2d6158683aee4cc838067727209a0aaf4359de3',
        '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
        '0x000000000000000000000000074976a8d5f07da5dada1eb248ad369a764bb373',
        '0x00000000000000000000000087557c10b7240f47a705a529d8d66dbb715db8f0'
      ))
    ).to.deep.eq({
      [LogFilterType.address]: {
        DataType: 'String',
        StringValue: '0xd2d6158683aee4cc838067727209a0aaf4359de3'
      },
      [LogFilterType.topic0]: {
        DataType: 'String',
        StringValue: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'
      },
      [LogFilterType.topic1]: {
        DataType: 'String',
        StringValue: '0x000000000000000000000000074976a8d5f07da5dada1eb248ad369a764bb373'
      },
      [LogFilterType.topic2]: {
        DataType: 'String',
        StringValue: '0x00000000000000000000000087557c10b7240f47a705a529d8d66dbb715db8f0'
      }
    });
  });

});