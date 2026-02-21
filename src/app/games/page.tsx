import type { Metadata } from 'next';
import { PageLayout } from '@/components/layout/page-layout';
import { Container } from '@/components/ui/container';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { GameFilter } from '@/components/games/game-filter';

export const metadata: Metadata = {
    title: 'Games',
    description: 'Explore a collection of interactive games spanning different genres and technologies built by Gamefolio.',
};

export default function Games() {
    return (
        <PageLayout>
            <Container className="py-12 md:py-16">
                <div className="mb-12">
                    <Heading level={1} className="mb-4 text-center">
                        Games
                    </Heading>
                    <Text className="text-center max-w-2xl mx-auto text-muted-foreground">
                        Explore a collection of interactive experiences spanning different genres and technologies.
                    </Text>
                </div>

                <GameFilter />
            </Container>
        </PageLayout>
    );
}
