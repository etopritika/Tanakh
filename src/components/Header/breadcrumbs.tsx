import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { segmentMap } from "@/lib/routes";
import { BreadcrumbSegment } from "@/lib/types";

interface BreadcrumbsProps {
  pathSegments: string[];
}

export function Breadcrumbs({ pathSegments }: BreadcrumbsProps) {
  const breadcrumbSegments = pathSegments
    .map((segment) => segmentMap[segment])
    .filter((segment): segment is BreadcrumbSegment => !!segment);

  return (
    <Breadcrumb className="py-2.5">
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
