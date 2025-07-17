package io.fundy.fundyserver.project.scheduler;

import io.fundy.fundyserver.project.service.ProjectService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class ProjectStatusScheduler {

    private final ProjectService projectService;

//    @Scheduled(cron = "*/10 * * * * *") // 매 10초마다 실행
@Scheduled(cron = "0 */10 * * * ?")
public void updateProjectStatuses() {
        log.info("🔄 상태 업데이트 시작");
        projectService.updateProjectStatusesByStartLine();       // APPROVED → IN_PROGRESS
        projectService.updateProjectStatusesAfterDeadline();     // IN_PROGRESS → COMPLETED / FAILED
        log.info("✅ 상태 업데이트 완료");
    }
}
