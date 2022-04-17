import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre
  const { deploy, get } = deployments
  const { deployer } = await getNamedAccounts()

  const ORACLE_ADDRESS = (await get('ChainlinkOracle_ETH')).address // TODO: replace with the oracle for your provider
  const PROVIDER_NAME = 'Squeeth'                                   // TODO: replace with the name of your provider's contract
  const PROVIDER_ARGS = [ORACLE_ADDRESS]                            // TODO: ensure these arguments match your provider's constructor (not initializer)

  const deployment = await deploy(PROVIDER_NAME, {
    from: deployer,
    args: PROVIDER_ARGS,
    skipIfAlreadyDeployed: true,
    log: true,
    autoMine: true,
  })

  console.log(`Successfully deployed provider ${PROVIDER_NAME} @ ${deployment.address}!`)
}

export default func
func.tags = ['Provider']
