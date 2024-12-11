import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";

type BreadcrumbSegment = {
  label: string;
  href: (segments: string[]) => string;
};

interface BreadcrumbsProps {
  pathSegments: string[];
}

const segmentMap: Record<string, BreadcrumbSegment> = {
  sections: {
    label: "Главная",
    href: () => "/sections",
  },
  books: {
    label: "Книги",
    href: (segments) => `/sections/${segments[1]}/books`,
  },
  chapters: {
    label: "Главы",
    href: (segments) =>
      `/sections/${segments[1]}/books/${segments[3]}/chapters/${
        segments[5] || 1
      }`,
  },
  chapter: {
    label: "Главы",
    href: (segments) =>
      `/sections/${segments[1]}/books/${segments[3]}/chapters/${
        segments[5] || 1
      }`,
  },
  verses: {
    label: "Стихи",
    href: (segments) =>
      `/sections/${segments[1]}/books/${segments[3]}/chapter/${
        segments[5]
      }/verses/${segments[7] || 1}`,
  },
  search: {
    label: "Поиск",
    href: (segments) => `/sections/${segments[1]}/search`,
  },
};

export function Breadcrumbs({ pathSegments }: BreadcrumbsProps) {
  const breadcrumbSegments = pathSegments
    .map((segment) => segmentMap[segment])
    .filter((segment): segment is BreadcrumbSegment => !!segment);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbSegments.map((segment, index) => {
          const href = segment.href(pathSegments);
          const isLast = index === breadcrumbSegments.length - 1;

          return (
            <React.Fragment key={segment.label}>
              {index > 0 && <BreadcrumbSeparator />}
              <BreadcrumbItem>
                {isLast ? (
                  <span>{segment.label}</span>
                ) : (
                  <BreadcrumbLink to={href}>{segment.label}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
