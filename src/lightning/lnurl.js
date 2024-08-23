import { LNURL , Payment} from '@lightninglabs/lnurl-types'

const lnurl = new LNURL()

lnurl.decode('https://example.com/lnurl')

lnurl.encode({
    tag: 'withdrawRequest',
    callback: 'https://example.com/lnurl/callback',
    k1: '1234567890',
    minWithdrawable: 1000,
    maxWithdrawable: 100000,
    defaultDescription: 'Example description',
    metadata: 'Example metadata',
    commentAllowed: 100,
    payerDataLabel: 'Payer data label',
    payerDataInstructions: 'Payer data instructions',
    payerDataRequired: true,
    payerDataOptional: true,
    payerDataOptionalLabel: 'Payer data optional label',
    payerDataOptionalInstructions: 'Payer data optional instructions',
    payerDataOptionalRequired: true,
    payerDataOptionalRequiredLabel: 'Payer data optional required label',
    payerDataOptionalRequiredInstructions: 'Payer data optional required instructions',
)}