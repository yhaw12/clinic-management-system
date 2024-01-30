import { Flex, Spin } from 'antd';

function Loading() {
  return (
    <Flex align="center" gap="middle">
    <Spin size="small" />
    <Spin />
    <Spin size="large" />
  </Flex>
  )
}

export default Loading
