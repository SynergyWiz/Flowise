import { INode, INodeData, INodeParams } from '../../../src/Interface'
import { getBaseClasses, getInputVariables } from '../../../src/utils'

class PromptTemplate_Prompts implements INode {
    label: string
    name: string
    description: string
    type: string
    icon: string
    category: string
    baseClasses: string[]
    inputs: INodeParams[]

    constructor() {
        this.label = 'Prompt Template'
        this.name = 'promptTemplate'
        this.type = 'PromptTemplate'
        this.icon = 'prompt.svg'
        this.category = 'Prompts'
        this.description = 'Schema to represent a basic prompt for an LLM. Template can only contains 1 literal string {}'
        this.inputs = [
            {
                label: 'Template',
                name: 'template',
                type: 'string',
                rows: 5,
                default: 'What is a good name for a company that makes {product}?',
                placeholder: 'What is a good name for a company that makes {product}?'
            }
        ]
    }

    async getBaseClasses(): Promise<string[]> {
        const { PromptTemplate } = await import('langchain/prompts')
        return getBaseClasses(PromptTemplate)
    }

    async init(nodeData: INodeData): Promise<any> {
        const { PromptTemplate } = await import('langchain/prompts')

        const template = nodeData.inputs?.template as string
        const inputVariables = getInputVariables(template)

        try {
            const prompt = new PromptTemplate({
                template,
                inputVariables: inputVariables
            })
            return prompt
        } catch (e) {
            throw new Error(e)
        }
    }
}

module.exports = { nodeClass: PromptTemplate_Prompts }