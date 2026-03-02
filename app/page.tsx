"use client"

import { Button, Badge, Tag, Card, CardImage, CardBody, CardFooter, H1, H2, H3, H4, Body, Small, Label, Separator, ScrollArea } from "@/components/ui"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12 text-center">
          <H1 className="mb-4">Component Library Preview</H1>
          <Body color="muted">すべてのUIコンポーネントのプレビュー</Body>
        </div>

        <div className="space-y-16">
          <section>
            <H2 className="mb-6">Typography</H2>
            <div className="bg-white rounded-xl p-8 space-y-6">
              <div>
                <H1>Heading 1</H1>
                <H2>Heading 2</H2>
                <H3>Heading 3</H3>
                <H4>Heading 4</H4>
              </div>
              <Separator />
              <div>
                <Body size="lg">Body Large - これは大きいボディテキストです。</Body>
                <Body>Body Medium - これは標準のボディテキストです。</Body>
                <Body size="sm">Body Small - これは小さいボディテキストです。</Body>
              </div>
              <Separator />
              <div>
                <Label>Label Text</Label>
                <Small>Small Text - 補足やキャプション用</Small>
              </div>
            </div>
          </section>

          <section>
            <H2 className="mb-6">Buttons</H2>
            <div className="bg-white rounded-xl p-8">
              <div className="space-y-4">
                <div className="flex flex-wrap gap-3">
                  <Button variant="default">Default</Button>
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="danger">Danger</Button>
                </div>
                <Separator />
                <div className="flex flex-wrap gap-3">
                  <Button size="sm">Small</Button>
                  <Button size="md">Medium</Button>
                  <Button size="lg">Large</Button>
                </div>
                <Separator />
                <div className="flex flex-wrap gap-3">
                  <Button loading>Loading</Button>
                  <Button disabled>Disabled</Button>
                  <Button full>Full Width</Button>
                </div>
              </div>
            </div>
          </section>

          <section>
            <H2 className="mb-6">Badges & Tags</H2>
            <div className="bg-white rounded-xl p-8">
              <div className="space-y-6">
                <div>
                  <H3 className="mb-3 text-sm font-medium text-gray-700">Badges</H3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="default">Default</Badge>
                    <Badge variant="success">Success</Badge>
                    <Badge variant="warning">Warning</Badge>
                    <Badge variant="error">Error</Badge>
                    <Badge variant="info">Info</Badge>
                  </div>
                </div>
                <Separator />
                <div>
                  <H3 className="mb-3 text-sm font-medium text-gray-700">Badges with Dot</H3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="success" dot>公開中</Badge>
                    <Badge variant="warning" dot>レビュー中</Badge>
                    <Badge variant="error" dot>エラー</Badge>
                  </div>
                </div>
                <Separator />
                <div>
                  <H3 className="mb-3 text-sm font-medium text-gray-700">Tags</H3>
                  <div className="flex flex-wrap gap-2">
                    <Tag>React</Tag>
                    <Tag>TypeScript</Tag>
                    <Tag>Next.js</Tag>
                    <Tag selected>Selected</Tag>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <H2 className="mb-6">Cards</H2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card variant="default">
                <CardImage
                  src="https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Sample image"
                  aspectRatio="16/9"
                />
                <CardBody>
                  <H3>Card Title</H3>
                  <Body size="sm" color="muted">
                    カードの説明文がここに入ります。
                  </Body>
                </CardBody>
                <CardFooter divider>
                  <Button variant="primary" size="sm">詳細を見る</Button>
                </CardFooter>
              </Card>

              <Card variant="bordered">
                <CardBody>
                  <H3>Bordered Card</H3>
                  <Body size="sm" color="muted">
                    ボーダー付きのカードです。
                  </Body>
                </CardBody>
              </Card>

              <Card variant="elevated">
                <CardBody>
                  <H3>Elevated Card</H3>
                  <Body size="sm" color="muted">
                    影付きのカードです。
                  </Body>
                </CardBody>
              </Card>
            </div>
          </section>

          <section>
            <H2 className="mb-6">Separator</H2>
            <div className="bg-white rounded-xl p-8">
              <div className="space-y-4">
                <Body>上のコンテンツ</Body>
                <Separator />
                <Body>下のコンテンツ</Body>
              </div>
            </div>
          </section>

          <section>
            <H2 className="mb-6">ScrollArea</H2>
            <div className="bg-white rounded-xl p-8">
              <ScrollArea className="h-48 border rounded-lg p-4">
                <div className="space-y-2">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div key={i} className="p-2 bg-gray-50 rounded">
                      Item {i + 1}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
