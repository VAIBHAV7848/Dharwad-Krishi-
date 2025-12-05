'use client';

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, ThumbsUp, Share2, Search, Plus } from "lucide-react";
import { useState } from 'react';
import { useUserStore } from '@/lib/store';
import { translations, Language } from '@/lib/translations';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";

const MOCK_POSTS = [
    {
        id: 1,
        author: "Ramesh Kumar",
        avatar: "RK",
        time: "2h ago",
        title: "Best fertilizer for Wheat in Karnataka?",
        content: "I am planning to sow wheat next week. Which NPK ratio is best for black soil in North Karnataka region?",
        likes: 12,
        comments: 4,
        tags: ["Wheat", "Fertilizer"]
    },
    {
        id: 2,
        author: "Suresh Patil",
        avatar: "SP",
        time: "5h ago",
        title: "Tomato Leaf Curl Virus - Help needed!",
        content: "My tomato plants are showing curling leaves and yellowing. Is this a virus? How to control it organically?",
        likes: 28,
        comments: 15,
        tags: ["Tomato", "Disease", "Organic"]
    },
    {
        id: 3,
        author: "Lakshmi Devi",
        avatar: "LD",
        time: "1d ago",
        title: "Market price for Onion in Bangalore?",
        content: "Does anyone know the current wholesale price for Onion in Yeshwanthpur mandi? I have 50 quintals to sell.",
        likes: 45,
        comments: 8,
        tags: ["Market", "Onion"]
    }
];

export default function ForumPage() {
    const { language } = useUserStore();
    const t = translations[language as Language];
    const [posts, setPosts] = useState(MOCK_POSTS);
    const [newPostOpen, setNewPostOpen] = useState(false);

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">{t.community}</h1>
                    <p className="text-muted-foreground">{t.connectFarmers}</p>
                </div>
                <Dialog open={newPostOpen} onOpenChange={setNewPostOpen}>
                    <DialogTrigger asChild>
                        <Button className="gap-2">
                            <Plus className="h-4 w-4" /> {t.askQuestion}
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{t.askQuestion}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">{t.title}</label>
                                <Input placeholder={t.titlePlaceholder} />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">{t.details}</label>
                                <Textarea placeholder={t.detailsPlaceholder} />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setNewPostOpen(false)}>{t.cancel}</Button>
                            <Button onClick={() => setNewPostOpen(false)}>{t.postQuestion}</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Search and Filter */}
            <div className="flex gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder={t.searchForum}
                        className="pl-8"
                    />
                </div>
            </div>

            {/* Posts Feed */}
            <div className="space-y-4">
                {posts.map((post) => (
                    <Card key={post.id} className="hover:shadow-md transition-shadow">
                        <CardHeader className="pb-3">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <Avatar>
                                        <AvatarFallback className="bg-primary/10 text-primary">{post.avatar}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="text-sm font-medium">{post.author}</p>
                                        <p className="text-xs text-muted-foreground">{post.time}</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    {post.tags.map(tag => (
                                        <span key={tag} className="bg-muted px-2 py-1 rounded-full text-xs text-muted-foreground">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <CardTitle className="mt-4 text-lg">{post.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="pb-3">
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                {post.content}
                            </p>
                        </CardContent>
                        <CardFooter className="border-t pt-3 flex gap-4">
                            <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-primary">
                                <ThumbsUp className="h-4 w-4" /> {post.likes}
                            </Button>
                            <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-primary">
                                <MessageSquare className="h-4 w-4" /> {post.comments} {t.comments}
                            </Button>
                            <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-primary ml-auto">
                                <Share2 className="h-4 w-4" /> {t.reply}
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
