import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Instagram, Twitter, Facebook, Globe, Mail } from "lucide-react";

interface Skill {
  name: string;
  level?: "beginner" | "intermediate" | "advanced" | "expert";
}

interface SocialLink {
  platform: "instagram" | "twitter" | "facebook" | "website" | "email";
  url: string;
}

interface ProfileCardProps {
  name: string;
  title?: string;
  bio?: string;
  profileImage?: string;
  bannerImage?: string;
  skills?: Skill[];
  socialLinks?: SocialLink[];
}

const ProfileCard = ({
  name = "Jane Doe",
  title = "Creative Artist",
  bio = "Passionate artist specializing in watercolor paintings and digital illustrations. Creating art that tells stories and evokes emotions.",
  profileImage = "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
  bannerImage = "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80",
  skills = [
    { name: "Painting", level: "expert" },
    { name: "Digital Art", level: "advanced" },
    { name: "Crafts", level: "intermediate" },
  ],
  socialLinks = [
    { platform: "instagram", url: "https://instagram.com" },
    { platform: "twitter", url: "https://twitter.com" },
    { platform: "website", url: "https://example.com" },
  ],
}: ProfileCardProps) => {
  // Function to render the appropriate social icon based on platform
  const renderSocialIcon = (platform: string) => {
    switch (platform) {
      case "instagram":
        return <Instagram size={18} />;
      case "twitter":
        return <Twitter size={18} />;
      case "facebook":
        return <Facebook size={18} />;
      case "website":
        return <Globe size={18} />;
      case "email":
        return <Mail size={18} />;
      default:
        return <Globe size={18} />;
    }
  };

  // Function to get badge color based on skill level
  const getSkillBadgeVariant = (level?: string) => {
    switch (level) {
      case "beginner":
        return "secondary";
      case "intermediate":
        return "outline";
      case "advanced":
        return "secondary";
      case "expert":
        return "default";
      default:
        return "outline";
    }
  };

  return (
    <Card className="w-full max-w-[350px] overflow-hidden bg-white">
      {/* Banner Image */}
      <div
        className="h-32 w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${bannerImage})` }}
      />

      {/* Profile Info */}
      <div className="relative px-6">
        <Avatar className="absolute -top-12 h-24 w-24 border-4 border-white">
          <AvatarImage src={profileImage} alt={name} />
          <AvatarFallback>{name.substring(0, 2)}</AvatarFallback>
        </Avatar>
      </div>

      <CardHeader className="pt-16">
        <CardTitle>{name}</CardTitle>
        <CardDescription>{title}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Bio */}
        <p className="text-sm text-muted-foreground">{bio}</p>

        {/* Skills */}
        <div>
          <h4 className="mb-2 text-sm font-medium">Skills</h4>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <Badge key={index} variant={getSkillBadgeVariant(skill.level)}>
                {skill.name}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter className="border-t pt-4">
        <div className="flex w-full justify-between">
          {socialLinks.map((link, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              className="rounded-full"
              asChild
            >
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${link.platform} profile`}
              >
                {renderSocialIcon(link.platform)}
              </a>
            </Button>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProfileCard;
